<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210214221233 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE film ADD api_id INT NOT NULL');
        $this->addSql('ALTER TABLE person ADD api_id INT NOT NULL');
        $this->addSql('ALTER TABLE specie ADD api_id INT NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE film DROP api_id');
        $this->addSql('ALTER TABLE person DROP api_id');
        $this->addSql('ALTER TABLE specie DROP api_id');
    }
}
