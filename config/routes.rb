Rails.application.routes.draw do
  resources :companies
  resources :order_products, only: [:create]
  resources :orders
  resources :products
  resources :users
  resources :login, only: [:create]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get '/current-user', to: 'users#get_current_user'
  # get '/order_products', to: 'order_products#index'
  # post '/order_products', to: 'order_products#create'
  # post '/order_products', to: 'orders#order_product_create'
end
