# /etc/nginx/conf.d/site_template.conf

index index.html;

location /_astro/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location ~* \.(?:jpg|jpeg|gif|png|ico|svg|webp|woff2?)$ {
    expires 7d;
    add_header Cache-Control "public, no-transform";
}

location / {
    try_files $uri $uri/ /index.html;
    add_header Cache-Control "no-cache";
}