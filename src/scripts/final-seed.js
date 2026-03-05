const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env.local') });

const projectIdeas = require('./project-data.js');

function transformIdeaForDb(idea) {
  return {
    id: idea.id,
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
  };
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓' : '✗');
  console.error('\nPlease ensure your .env.local file exists at: /usr/src/app/.env.local');
  console.error('And contains both variables.');
  process.exit(1);
}

console.log('✅ Environment variables loaded successfully');
console.log('📊 Project URL:', supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedDatabase() {
  console.log('🚀 Starting to seed database...');
  console.log(`📁 Total projects to seed: ${projectIdeas.length}`);
  
  const transformedIdeas = projectIdeas.map(transformIdeaForDb);
  
  let success = 0;
  let failed = 0;
  
  for (const idea of transformedIdeas) {
    console.log(`\n📤 Seeding: ${idea.title}...`);
    const { data, error } = await supabase
      .from('project_ideas')
      .upsert(idea, { onConflict: 'id' });
    
    if (error) {
      console.error(`❌ Error:`, error.message);
      failed++;
    } else {
      console.log(`✅ Success: ${idea.title}`);
      success++;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 SEEDING SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Successful: ${success}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📁 Total: ${projectIdeas.length}`);
}

seedDatabase().catch(console.error);
