class ContactFormController < ApplicationController
  def new
  	@contact_form = ContactForm.new
  end

  def create
  	begin
  		@contact_form = ContactForm.new(params[:contact_form])
  		@contact_form.request = request
  		if @contact_form.deliver
  			flash.now[:notice] = "Thanks for your message!"
  		else
  			render :new
  		end
  	rescue ScriptError
  		flash[:error] = "Sorry, your message couldn't be sent"
  	end
  end

  def index
    sleep 1 #development only, simulates wait time
    respond_to do |format|
      format.html { redirect_to root_path } #for my controller, i wanted it to be JS only
      format.js
    end
  end

end