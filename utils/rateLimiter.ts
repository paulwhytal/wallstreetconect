const RATE_LIMIT_DURATION = 5 * 60 * 1000; // 5 minutes
const MAX_ATTEMPTS = 5;

class RateLimiter {
  private attempts: number = 0;
  private lastAttemptTime: number = 0;

  canAttempt(): boolean {
    const now = Date.now();
    if (now - this.lastAttemptTime > RATE_LIMIT_DURATION) {
      this.attempts = 0;
    }
    
    if (this.attempts < MAX_ATTEMPTS) {
      this.attempts++;
      this.lastAttemptTime = now;
      return true;
    }
    
    return false;
  }

  getRemainingTime(): number {
    return Math.max(0, RATE_LIMIT_DURATION - (Date.now() - this.lastAttemptTime));
  }
}

export const authRateLimiter = new RateLimiter();