#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#	  http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#


from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp import util
from google.appengine.api import urlfetch
import os
import base64
import urllib


class MainHandler(webapp.RequestHandler):

	def get(self):
		path = os.path.join(os.path.dirname(__file__), 'index.html')
		self.response.out.write(template.render(path, {}))

# Sends a POST with basic auth to the Twitter REST API to update status
class UpdateHandler(webapp.RequestHandler):
	def get(self):
		status = self.request.get("status")
		username = self.request.get("username")
		password = self.request.get("password")
		callback = self.request.get("callback")
		
		payload = urllib.urlencode({
			"status": status
		})
		
		auth_token = base64.b64encode(username + ":" + password)
		
		response = urlfetch.fetch("http://api.twitter.com/1/statuses/update.json",
				payload=payload,
				method=urlfetch.POST,
				headers={
					"Authorization": "Basic " + auth_token
				}
			)
		
		# not robust for errors, obviously
		if response.status_code == "200":
			content = response.content
		else:
			content =  response.content
		
		self.response.out.write(callback + "(" + content + ")")

# Sends a GET with basic auth to the Twitter REST API to get a home timeline
class HomeTimelineHandler(webapp.RequestHandler):
	def get(self):
		username = self.request.get("username")
		password = self.request.get("password")
		callback = self.request.get("callback")
		
		auth_token = base64.b64encode(username + ":" + password)
		
		response = urlfetch.fetch("http://api.twitter.com/1/statuses/home_timeline.json",
				method=urlfetch.GET,
				headers={
					"Authorization": "Basic " + auth_token
				}
			)
		
		# not robust for errors, obviously
		if response.status_code == "200":
			content = response.content
		else:
			content =  response.content
		
		self.response.out.write(callback + "(" + content + ")")

def main():
	application = webapp.WSGIApplication([
			('/updateStatus', UpdateHandler),
			('/homeTimeline', HomeTimelineHandler),
			('/', MainHandler),
		], debug=True)
	util.run_wsgi_app(application)

if __name__ == '__main__':
	main()