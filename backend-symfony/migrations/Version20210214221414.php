<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210214221414 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8244BE2254963938 ON film (api_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_34DCD17654963938 ON person (api_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_A28097254963938 ON specie (api_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_8244BE2254963938 ON film');
        $this->addSql('DROP INDEX UNIQ_34DCD17654963938 ON person');
        $this->addSql('DROP INDEX UNIQ_A28097254963938 ON specie');
    }
}
