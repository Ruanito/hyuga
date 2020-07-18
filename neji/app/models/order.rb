class Order
  include Mongoid::Document

  field :user_info, type: Hash
  field :address_attributes, type: Hash
  field :request_info, type: Hash

end
