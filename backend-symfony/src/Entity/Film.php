<?php

namespace App\Entity;

use App\Repository\FilmRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=FilmRepository::class)
 */
class Film
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @ORM\Column(type="integer")
     */
    private $episode_id;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $opening_crawl;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $director;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $producer;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $release_date;

    /**
     * @ORM\ManyToMany(targetEntity=Person::class, mappedBy="films")
     */
    private $characters;

    /**
     * @ORM\Column(type="integer", unique=true)
     */
    private $api_id;

    public function __construct()
    {
        $this->characters = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getEpisodeId(): ?int
    {
        return $this->episode_id;
    }

    public function setEpisodeId(int $episode_id): self
    {
        $this->episode_id = $episode_id;

        return $this;
    }

    public function getOpeningCrawl(): ?string
    {
        return $this->opening_crawl;
    }

    public function setOpeningCrawl(?string $opening_crawl): self
    {
        $this->opening_crawl = $opening_crawl;

        return $this;
    }

    public function getDirector(): ?string
    {
        return $this->director;
    }

    public function setDirector(?string $director): self
    {
        $this->director = $director;

        return $this;
    }

    public function getProducer(): ?string
    {
        return $this->producer;
    }

    public function setProducer(?string $producer): self
    {
        $this->producer = $producer;

        return $this;
    }

    public function getReleaseDate(): ?\DateTimeInterface
    {
        return $this->release_date;
    }

    public function setReleaseDate(?\DateTimeInterface $release_date): self
    {
        $this->release_date = $release_date;

        return $this;
    }

    /**
     * @return Collection|Person[]
     */
    public function getCharacters(): Collection
    {
        return $this->characters;
    }

    public function addCharacter(Person $character): self
    {
        if (!$this->characters->contains($character)) {
            $this->characters[] = $character;
            $character->addFilm($this);
        }

        return $this;
    }

    public function removeCharacter(Person $character): self
    {
        if ($this->characters->removeElement($character)) {
            $character->removeFilm($this);
        }

        return $this;
    }

    public function getApiId(): ?int
    {
        return $this->api_id;
    }

    public function setApiId(int $api_id): self
    {
        $this->api_id = $api_id;

        return $this;
    }
    
    public function toArray()
    {
        return [
            'id'            => $this->getId(),
            'title'         => $this->getTitle(),
            'episode_id'    => $this->getEpisodeId(),
            'opening_crawl' => $this->getOpeningCrawl(),
            'director'      => $this->getDirector(),
            'producer'      => $this->getProducer(),
            'release_date'  => $this->getReleaseDate(),
            'api_id'        => $this->getApiId(),
        ];
    }

    public function populateWithArray(array $array): self
    {
        foreach ($array as $attribute => $value)
        {
            if($value == "unknown")
                continue;
            
            if(property_exists($this, $attribute))
                $this->$attribute = $value;
        }

        return $this;
    }
}
