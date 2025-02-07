# Use the latest available PHP image, adjusted below for PHP 8.1
FROM php:8.3-fpm

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    git \
    unzip \
    libssl-dev

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Install MongoDB extension
RUN pecl install mongodb && docker-php-ext-enable mongodb

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy the Laravel application source code
COPY . .

# Copy the .env file
COPY .env.example .env

# Install Laravel dependencies
RUN composer install

# Generate Laravel key
RUN php artisan key:generate

# Expose port 8000 and start the Laravel development server
EXPOSE 8000
CMD php artisan serve --host=0.0.0.0 --port=8000