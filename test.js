var prismic = require('./prismic-helpers');
	var start_time = new Date()
	prismic.getApiHome(undefined, function(err, Api) {
			if (err) { exports.onPrismicError(err, req, res); return; }
			var ref = Api.master(),
				ctx = {
					api: Api,
					ref: ref,
					maybeRef: ref == Api.master() ? undefined : ref,
					oauth: function() {
						var token = req.session['ACCESS_TOKEN'];
						return {
							accessToken: token,
							hasPrivilegedAccess: !!token
						}
					},
					linkResolver: function(ctx, doc) {
						return Configuration.linkResolver(ctx, doc);
					}
				};
				ctx.api.form("everything").ref(ctx.ref).query('[[:d = at(document.id, "UxfZHgEAAHUkg31d")]]').submit(function(err, people) {
					var end_time = new Date()
					console.log((end_time.getTime() - start_time.getTime())/1000 + ' seconds to fetch the document below: ');
					console.log(people);
				})
			})
