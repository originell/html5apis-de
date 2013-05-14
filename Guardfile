# Taken from
# https://github.com/edoburu/django-project-template/blob/master/Guardfile
#
# A sample Guardfile
# More info at https://github.com/guard/guard#readme
#
# Installation requirements:
#
#   gem install guard-livereload guard-compass
#
# Browser plugins:
#   All: http://help.livereload.com/kb/general-use/browser-extensions
#   Firefox (2.0.9 dev release): https://github.com/siasia/livereload-extensions/downloads
#
notification :off
interactor :off
logger :level => :debug


#guard 'compass' do
  ## Always touch screen.scss too, a workaround for compass 0.12.2
  #watch(%r{(.*)\.s[ac]ss$}) {|m| "static/sass/screen.sass"}
#end

guard 'livereload', :host => '127.0.0.1' do
  watch(%r{.+\.(css|js|html)$})
  #watch(%r{.+\.(css|js|html|pyc)$})
end

guard 'compass' do
  #watch('^src/(.*)\.s[ac]ss')
  watch(%r{^static/(.*)\.s[ac]ss$})
end
