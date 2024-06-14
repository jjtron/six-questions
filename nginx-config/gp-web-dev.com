server {

        root /var/www/gp-web-dev.com/html;
        index index.html index.htm index.nginx-debian.html;

        server_name gp-web-dev.com www.gp-web-dev.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/gp-web-dev.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/gp-web-dev.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot


}
server {
    if ($host = www.gp-web-dev.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = gp-web-dev.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


        listen 80;
        listen [::]:80;

        server_name gp-web-dev.com www.gp-web-dev.com;
    return 404; # managed by Certbot




}