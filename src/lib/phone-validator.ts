export class PhoneValidator {
  private static instance: PhoneValidator
  private storageKey = "team_mulila_phone_attempts"

  static getInstance(): PhoneValidator {
    if (!PhoneValidator.instance) {
      PhoneValidator.instance = new PhoneValidator()
    }
    return PhoneValidator.instance
  }

  trackPhoneAttempt(phone: string): {
    allowed: boolean
    remainingAttempts: number
    waitTime: number
  } {
    const now = Date.now()
    const attempts = this.getPhoneAttempts(phone)
    const recentAttempts = attempts.filter(t => now - t < 86400000) // 24 hours

    if (recentAttempts.length >= 5) {
      const oldestAttempt = Math.min(...recentAttempts)
      const waitTime = 86400000 - (now - oldestAttempt)
      return {
        allowed: false,
        remainingAttempts: 0,
        waitTime: Math.ceil(waitTime / 3600000)
      }
    }

    recentAttempts.push(now)
    localStorage.setItem(`${this.storageKey}_${phone}`, JSON.stringify(recentAttempts))

    return {
      allowed: true,
      remainingAttempts: 5 - recentAttempts.length,
      waitTime: 0
    }
  }

  private getPhoneAttempts(phone: string): number[] {
    const stored = localStorage.getItem(`${this.storageKey}_${phone}`)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch {
        return []
      }
    }
    return []
  }

  isValidKenyanPhone(phone: string): boolean {
    const cleanPhone = phone.replace(/\s/g, '')
    const patterns = [
      /^(07|01|02)[0-9]{8}$/,
      /^254[0-9]{9}$/,
      /^\+254[0-9]{9}$/
    ]
    return patterns.some(pattern => pattern.test(cleanPhone))
  }

  formatPhoneNumber(phone: string): string {
    let clean = phone.replace(/\s/g, '')
    if (clean.startsWith('0')) {
      clean = '254' + clean.substring(1)
    } else if (clean.startsWith('+')) {
      clean = clean.substring(1)
    }
    return clean
  }
}
