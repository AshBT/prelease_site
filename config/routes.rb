RailsPrelaunchSignup::Application.routes.draw do

  resources :contact_form, only: [:new, :create, :index]

  authenticated :user do
    root :to => 'users#index'

  end

  devise_scope :user do
    root :to => "devise/registrations#new"
    match '/user/confirmation' => 'confirmations#update', :via => :put, :as => :update_user_confirmation
    match '/user/sign_out' => 'sessions#destroy', :via => :delete, :as => :sign_out
  end

  devise_for :users, :controllers => { :registrations => "registrations", :confirmations => "confirmations"}
  match 'users/bulk_invite/:quantity' => 'users#bulk_invite', :via => :get, :as => :bulk_invite
  
  resources :users do
    get 'invite', :on => :member
  end

  match 'sign_out' => 'sessions#destroy', :via => :delete, :as => :sign_out
  # match "/blog" => "http://contextualyze.tumblr.com"
  end