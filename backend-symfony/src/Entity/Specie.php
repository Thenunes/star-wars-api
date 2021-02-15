<?php

namespace App\Entity;

use App\Repository\SpecieRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=SpecieRepository::class)
 */
class Specie
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
     * @ORM\OneToMany(targetEntity=Person::class, mappedBy="specie")
     */
    private $people;

    /**
     * @ORM\Column(type="integer", unique=true)
     */
    private $api_id;

    public function __construct()
    {
        $this->people = new ArrayCollection();
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

    /**
     * @return Collection|Person[]
     */
    public function getPeople(): Collection
    {
        return $this->people;
    }

    public function addPerson(Person $person): self
    {
        if (!$this->people->contains($person)) {
            $this->people[] = $person;
            $person->setSpecie($this);
        }

        return $this;
    }

    public function removePerson(Person $person): self
    {
        if ($this->people->removeElement($person)) {
            // set the owning side to null (unless already changed)
            if ($person->getSpecie() === $this) {
                $person->setSpecie(null);
            }
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
            'id'        => $this->getId(),
            'name'      => $this->getName(),
            'api_id'    => $this->getApiId(),
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
