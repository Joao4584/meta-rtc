import { FastifyInstance } from 'fastify';
import swagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { version } from '../../package.json';

const swaggerPlugin = async (server: FastifyInstance) => {
  const swaggerOptions = {
    swagger: {
      info: {
        title: 'My Title',
        description: 'My Description.',
        version,
      },
      host: 'localhost',
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [{ name: 'Default', description: 'Default' }],
    },
  };

  const swaggerUiOptions = {
    routePrefix: '/docs',
    exposeRoute: true,
  };

  await server.register(swagger, swaggerOptions);
  await server.register(fastifySwaggerUi, swaggerUiOptions);
};

export default swaggerPlugin;
