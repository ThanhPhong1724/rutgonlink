import { Module, Global } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
    imports: [
        CacheModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                store: 'memory', // Use in-memory for simpler init, can be replaced by redis store from cache-manager-redis-yet
                // host: configService.get('REDIS_HOST', 'localhost'),
                // port: configService.get('REDIS_PORT', 6379),
            }),
            inject: [ConfigService],
        }),
    ],
    exports: [CacheModule],
})
export class RedisCacheModule { }
