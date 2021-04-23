const fastify = require('fastify')({ logger: true })

const port = process.env.PORT || 4000

fastify.route({
  method: 'GET',
  url: '/greet',
  schema: {
    querystring: {
      type: 'object',
      properties: {
        greeting: { type: 'string' },
        name: { type: 'string' },
        excited: { type: 'boolean' }
      },
      required: ['name']
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    }
  },
  handler: function (request, reply) {
    const greeting = request.query.greeting ? request.query.greeting : 'Hello'
    const name = request.query.name
    let message = greeting + ' ' + name + '!'
    if (request.query.excited) {
      message = message.toUpperCase() + '!!'
    }

    reply.send({ message })
  }
})

const start = async () => {
  try {
    await fastify.listen(port, '0.0.0.0')
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
