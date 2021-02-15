<?php

namespace App\Entity;

use App\Repository\PersonRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PersonRepository::class)
 */
class Person
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
    private $name;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $height;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $mass;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $hair_color;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $skin_color;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $eye_color;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $birth_year;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $gender;

    /**
     * @ORM\ManyToOne(targetEntity=Specie::class, inversedBy="people", cascade={"persist"})
     */
    private $specie;

    /**
     * @ORM\ManyToMany(targetEntity=Film::class, inversedBy="characters", cascade={"persist"})
     */
    private $films;

    /**
     * @ORM\Column(type="integer", unique=true)
     */
    private $api_id;

    public function __construct()
    {
        $this->films = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getHeight(): ?float
    {
        return $this->height;
    }

    public function setHeight(?float $height): self
    {
        $this->height = $height;

        return $this;
    }

    public function getMass(): ?float
    {
        return $this->mass;
    }

    public function setMass(?float $mass): self
    {
        $this->mass = $mass;

        return $this;
    }

    public function getHairColor(): ?string
    {
        return $this->hair_color;
    }

    public function setHairColor(?string $hair_color): self
    {
        $this->hair_color = $hair_color;

        return $this;
    }

    public function getSkinColor(): ?string
    {
        return $this->skin_color;
    }

    public function setSkinColor(?string $skin_color): self
    {
        $this->skin_color = $skin_color;

        return $this;
    }

    public function getEyeColor(): ?string
    {
        return $this->eye_color;
    }

    public function setEyeColor(?string $eye_color): self
    {
        $this->eye_color = $eye_color;

        return $this;
    }

    public function getBirthYear(): ?string
    {
        return $this->birth_year;
    }

    public function setBirthYear(?string $birth_year): self
    {
        $this->birth_year = $birth_year;

        return $this;
    }

    public function getGender(): ?string
    {
        return $this->gender;
    }

    public function setGender(?string $gender): self
    {
        $this->gender = $gender;

        return $this;
    }

    public function getSpecie(): ?Specie
    {
        return $this->specie;
    }

    public function setSpecie(?Specie $specie): self
    {
        $this->specie = $specie;

        return $this;
    }

    /**
     * @return Collection|Film[]
     */
    public function getFilms(): Collection
    {
        return $this->films;
    }

    public function addFilm(Film $film): self
    {
        if (!$this->films->contains($film)) {
            $this->films[] = $film;
        }

        return $this;
    }

    public function removeFilm(Film $film): self
    {
        $this->films->removeElement($film);

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
            'name'          => $this->getName(),
            'height'        => $this->getHeight(),
            'mass'          => $this->getMass(),
            'hair_color'    => $this->getHairColor(),
            'skin_color'    => $this->getSkinColor(),
            'eye_color'     => $this->getEyeColor(),
            'birth_year'    => $this->getBirthYear(),
            'gender'        => $this->getGender(),
            'api_id'        => $this->getApiId(),
        ];
    }

    public function toArrayWithRelations()
    {
        $data = $this->toArray();
        $data['specie'] = !empty($this->specie) ? $this->specie->toArray() : null;

        foreach ($this->films as $film)
            $data['films'][] = $film->toArray();
        
        return $data;
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
