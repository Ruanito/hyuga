class Order
  include Mongoid::Document

  field :user_info, type: Hash
  field :address_attributes, type: Hash
  field :request_info, type: Hash

  validates :user_info, :address_attributes, :request_info, presence: true
end
