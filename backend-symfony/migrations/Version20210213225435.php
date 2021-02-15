<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210213225435 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE film (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, episode_id INT NOT NULL, opening_crawl LONGTEXT DEFAULT NULL, director VARCHAR(255) DEFAULT NULL, producer VARCHAR(255) DEFAULT NULL, release_date DATE DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE person (id INT AUTO_INCREMENT NOT NULL, specie_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, height DOUBLE PRECISION DEFAULT NULL, mass DOUBLE PRECISION DEFAULT NULL, hair_color VARCHAR(255) DEFAULT NULL, skin_color VARCHAR(255) DEFAULT NULL, eye_color VARCHAR(255) DEFAULT NULL, birth_year VARCHAR(255) DEFAULT NULL, gender VARCHAR(255) DEFAULT NULL, INDEX IDX_34DCD176D5436AB7 (specie_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE person_film (person_id INT NOT NULL, film_id INT NOT NULL, INDEX IDX_8A23A09217BBB47 (person_id), INDEX IDX_8A23A09567F5183 (film_id), PRIMARY KEY(person_id, film_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE specie (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE person ADD CONSTRAINT FK_34DCD176D5436AB7 FOREIGN KEY (specie_id) REFERENCES specie (id)');
        $this->addSql('ALTER TABLE person_film ADD CONSTRAINT FK_8A23A09217BBB47 FOREIGN KEY (person_id) REFERENCES person (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE person_film ADD CONSTRAINT FK_8A23A09567F5183 FOREIGN KEY (film_id) REFERENCES film (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE person_film DROP FOREIGN KEY FK_8A23A09567F5183');
        $this->addSql('ALTER TABLE person_film DROP FOREIGN KEY FK_8A23A09217BBB47');
        $this->addSql('ALTER TABLE person DROP FOREIGN KEY FK_34DCD176D5436AB7');
        $this->addSql('DROP TABLE film');
        $this->addSql('DROP TABLE person');
        $this->addSql('DROP TABLE person_film');
        $this->addSql('DROP TABLE specie');
    }
}
