# Stage 1: Build dependencies
FROM composer:latest AS composer
WORKDIR /app

# Copy application files and install dependencies
COPY . .
RUN composer install --no-dev --optimize-autoloader

# Stage 2: Final image
FROM php:8.2-fpm
WORKDIR /var/www

# Install required system packages and PHP extensions
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    unzip \
    git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd zip pdo pdo_mysql bcmath

# Copy application files and dependencies from the composer stage
COPY --from=composer /app /var/www

# Ensure correct permissions for storage and cache
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Optimize Laravel for production
RUN php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache

# Fetch news articles command
RUN php artisan news:fetch

# Expose the default PHP-FPM port
EXPOSE 8000

# Set PHP-FPM as the default command
CMD ["php-fpm"]
