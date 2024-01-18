#!/bin/sh

variables="REACT_APP_API_URL REACT_APP_SENTRY_DSN"
web_root="/usr/share/nginx/html"

# Replace env vars in JavaScript files
for variable in $variables;
do
for file in $(find $web_root -name '*.js' -or -name '*.js.map');
do
  echo "Replacing $variable in $file ...";

  # Use the existing JS file as template
  if [ ! -f $file.tmpl.js ]; then
    cp $file $file.tmpl.js
  fi

  envsubst "\$$variable" < $file.tmpl.js > $file

  # Remove template
  rm $file.tmpl.js
done
done