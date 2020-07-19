require "bunny"

class Message::MessageService
  class << self
    def send_message(message = {}, queue_name)
        connection = Bunny.new(ENV['BYAKUGAN'])
        connection.start

        channel = connection.create_channel
        queue = channel.queue(queue_name)

        channel.default_exchange.publish(message.to_json, routing_key: queue.name)

        connection.close
    end
  end
end
