import { createClient } from 'redis'
import { logger } from './logger'

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'

export const redisClient = createClient({
  url: redisUrl,
  socket: {
    connectTimeout: 60000,
    lazyConnect: true,
  },
  retryDelayOnFailover: 100,
  retryDelayOnClusterDown: 300,
  maxRetriesPerRequest: 3,
})

redisClient.on('error', (err) => {
  logger.error('Redis Client Error:', err)
})

redisClient.on('connect', () => {
  logger.info('Redis Client Connected')
})

redisClient.on('ready', () => {
  logger.info('Redis Client Ready')
})

redisClient.on('end', () => {
  logger.info('Redis Client Disconnected')
})

export const connectRedis = async (): Promise<void> => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect()
    }
  } catch (error) {
    logger.error('Failed to connect to Redis:', error)
    throw error
  }
}

export const disconnectRedis = async (): Promise<void> => {
  try {
    if (redisClient.isOpen) {
      await redisClient.quit()
    }
  } catch (error) {
    logger.error('Failed to disconnect from Redis:', error)
  }
}

// Redis utility functions
export class RedisService {
  static async get(key: string): Promise<string | null> {
    try {
      return await redisClient.get(key)
    } catch (error) {
      logger.error(`Redis GET error for key ${key}:`, error)
      return null
    }
  }

  static async set(key: string, value: string, ttl?: number): Promise<boolean> {
    try {
      if (ttl) {
        await redisClient.setEx(key, ttl, value)
      } else {
        await redisClient.set(key, value)
      }
      return true
    } catch (error) {
      logger.error(`Redis SET error for key ${key}:`, error)
      return false
    }
  }

  static async del(key: string): Promise<boolean> {
    try {
      await redisClient.del(key)
      return true
    } catch (error) {
      logger.error(`Redis DEL error for key ${key}:`, error)
      return false
    }
  }

  static async exists(key: string): Promise<boolean> {
    try {
      const result = await redisClient.exists(key)
      return result === 1
    } catch (error) {
      logger.error(`Redis EXISTS error for key ${key}:`, error)
      return false
    }
  }

  static async incr(key: string): Promise<number> {
    try {
      return await redisClient.incr(key)
    } catch (error) {
      logger.error(`Redis INCR error for key ${key}:`, error)
      return 0
    }
  }

  static async expire(key: string, ttl: number): Promise<boolean> {
    try {
      await redisClient.expire(key, ttl)
      return true
    } catch (error) {
      logger.error(`Redis EXPIRE error for key ${key}:`, error)
      return false
    }
  }
}