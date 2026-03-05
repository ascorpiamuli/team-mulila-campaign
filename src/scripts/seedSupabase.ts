// scripts/seedSupabase.ts
import { createClient } from '@supabase/supabase-js'
import { projectIdeas, ProjectIdea } from '../data/ideas'


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

// Use service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Transform camelCase to snake_case for database
function transformIdeaForDb(idea: ProjectIdea) {
  return {
    id: idea.id, // Note: if your table uses SERIAL, you might want to remove this
    slug: idea.slug,
    title: idea.title,
    description: idea.description,
    full_description: idea.fullDescription || null,
    problem: idea.problem,
    solution: idea.solution,
    technologies: idea.technologies,
    complexity: idea.complexity,
    status: idea.status,
    seeking_collaborators: idea.seekingCollaborators,
    estimated_timeline: idea.estimatedTimeline || null,
    category: idea.category,
    motivation: idea.motivation || null,
    challenges: idea.challenges || [],
    features: idea.features || [],
    discussion_url: idea.discussionUrl || null,
    github_url: idea.githubUrl || null,
    collaborators_needed: idea.collaboratorsNeeded || [],
    inspiration: idea.inspiration || null,
    priority: idea.priority,
    date_added: idea.dateAdded,
    docker_images: idea.dockerImages || [],
    architecture: idea.architecture || null
  }
}

async function seedProjectIdeas() {
  console.log('🚀 Starting to seed project ideas to Supabase...')
  console.log(`📊 Total projects to seed: ${projectIdeas.length}`)

  // Transform all ideas
  const transformedIdeas = projectIdeas.map(transformIdeaForDb)

  // Log the first idea as a sample
  console.log('\n📝 Sample transformed data:')
  console.log(JSON.stringify(transformedIdeas[0], null, 2))

  try {
    // Option 1: Clear existing data (uncomment if you want to start fresh)
    console.log('\n🗑️  Checking for existing data...')
    const { count } = await supabase
      .from('project_ideas')
      .select('*', { count: 'exact', head: true })

    if (count && count > 0) {
      console.log(`Found ${count} existing records.`)
      
      // Ask for confirmation if running in interactive mode
      if (process.env.CONFIRM_DELETE === 'true') {
        console.log('Deleting existing data...')
        const { error: deleteError } = await supabase
          .from('project_ideas')
          .delete()
          .neq('id', '0')
        
        if (deleteError) {
          console.error('❌ Error clearing existing data:', deleteError)
          process.exit(1)
        }
        console.log('✅ Existing data cleared')
      } else {
        console.log('⚠️  Skipping delete. Set CONFIRM_DELETE=true to clear existing data.')
      }
    }

    // Insert data in batches
    const batchSize = 2
    let successCount = 0
    let errorCount = 0

    console.log(`\n📦 Inserting data in batches of ${batchSize}...`)

    for (let i = 0; i < transformedIdeas.length; i += batchSize) {
      const batch = transformedIdeas.slice(i, i + batchSize)
      const batchNumber = Math.floor(i / batchSize) + 1
      const totalBatches = Math.ceil(transformedIdeas.length / batchSize)
      
      console.log(`\n📦 Processing batch ${batchNumber}/${totalBatches}...`)
      
      const { data, error } = await supabase
        .from('project_ideas')
        .insert(batch)
        .select()

      if (error) {
        console.error(`❌ Error inserting batch ${batchNumber}:`, error)
        console.error('Failed batch:', batch.map(b => b.title))
        errorCount += batch.length
      } else {
        console.log(`✅ Successfully inserted batch ${batchNumber}:`)
        data?.forEach(item => {
          console.log(`   - ${item.title} (${item.slug})`)
          successCount++
        })
      }

      // Small delay to avoid rate limiting
      if (i + batchSize < transformedIdeas.length) {
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    }

    // Summary
    console.log('\n' + '='.repeat(50))
    console.log('📊 SEEDING SUMMARY')
    console.log('='.repeat(50))
    console.log(`✅ Successfully seeded: ${successCount} projects`)
    console.log(`❌ Failed: ${errorCount} projects`)
    console.log(`📁 Total: ${transformedIdeas.length} projects`)
    
    if (errorCount === 0) {
      console.log('\n✨ All project ideas successfully seeded to Supabase!')
    } else {
      console.log('\n⚠️  Seeding completed with some errors. Check the logs above.')
    }

  } catch (error) {
    console.error('💥 Fatal error during seeding:', error)
    process.exit(1)
  }
}

// Verify the seeded data
async function verifySeed() {
  console.log('\n🔍 Verifying seeded data...')

  const { data, error, count } = await supabase
    .from('project_ideas')
    .select('id, title, status, category, priority, seeking_collaborators', { count: 'exact' })

  if (error) {
    console.error('❌ Error verifying data:', error)
    return
  }

  console.log(`📊 Total records in database: ${count}`)
  
  if (data && data.length > 0) {
    console.log('\n📋 Sample records:')
    data.slice(0, 5).forEach(idea => {
      console.log(`   - ${idea.title} (${idea.status}) [${idea.category}]`)
    })

    // Additional statistics
    const seekingCollab = data.filter(idea => idea.seeking_collaborators).length
    console.log(`\n📈 Statistics:`)
    console.log(`   - Seeking collaborators: ${seekingCollab}`)
    
    const byStatus = data.reduce((acc: any, idea) => {
      acc[idea.status] = (acc[idea.status] || 0) + 1
      return acc
    }, {})
    console.log('   - By status:', byStatus)
  }
}

// Handle ID conflict strategy
async function upsertInstead() {
  console.log('🔄 Using UPSERT strategy instead of INSERT...')

  const transformedIdeas = projectIdeas.map(transformIdeaForDb)

  const { data, error } = await supabase
    .from('project_ideas')
    .upsert(transformedIdeas, {
      onConflict: 'slug', // Use slug as conflict resolution field
      ignoreDuplicates: false // Set to true to skip updates for existing records
    })
    .select()

  if (error) {
    console.error('❌ Error upserting data:', error)
    throw error
  }

  console.log(`✅ Successfully upserted ${data?.length} project ideas`)
  return data
}

// Main function with command line argument support
async function main() {
  const args = process.argv.slice(2)
  const useUpsert = args.includes('--upsert')
  const confirmDelete = args.includes('--confirm-delete')

  if (confirmDelete) {
    process.env.CONFIRM_DELETE = 'true'
  }

  try {
    if (useUpsert) {
      console.log('🔄 Running in UPSERT mode...')
      await upsertInstead()
    } else {
      console.log('📝 Running in INSERT mode...')
      await seedProjectIdeas()
    }
    
    await verifySeed()
    
    console.log('\n✨ Database seeding completed!')
  } catch (error) {
    console.error('💥 Seeding failed:', error)
    process.exit(1)
  }
}

// Run the script
main()