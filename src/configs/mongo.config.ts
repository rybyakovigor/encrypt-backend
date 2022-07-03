// Core
import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

const getMongoOptions = () => ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const getMongoString = (configService: ConfigService) => {
  return (
    'mongodb://' +
    configService.get('MONGODB_USERNAME') +
    ':' +
    configService.get('MONGODB_PASSWORD') +
    '@' +
    configService.get('MONGODB_HOST') +
    ':' +
    configService.get('MONGODB_PORT') +
    '/' +
    configService.get('MONGODB_DATABASE_NAME') +
    '?authSource=admin'
  );
};

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
  return {
    uri: getMongoString(configService),
    ...getMongoOptions(),
  };
};
