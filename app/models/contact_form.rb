class ContactForm < MailForm::Base
  attributes :name,  :validate => true
  attributes :email, :validate => /\A([\w\.%\+\-]+)@([\w\-]+\.)+([\w]{2,})\z/i
  attributes :message
  attribute :nickname, :captcha => true

  def headers
    {
      :to => "info@contextualyze.com",
      :from => %("#{name}" <#{email}>),
      :subject => "Contact Form Message"
    }
  end

end