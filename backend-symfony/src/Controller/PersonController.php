<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use DateTime;

use App\Entity\Person;
use App\Entity\Film;
use App\Entity\Specie;

class PersonController extends AbstractController
{

	private function getDataFromApi($url){
		$curl = curl_init();
		curl_setopt_array($curl, array(
			CURLOPT_URL => $url,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => "",
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => "GET",
		));

		$response = curl_exec($curl);
		curl_close($curl);

		return json_decode($response, true);
	}

    private function getIdFromApiUrl($url){
        preg_match('/http:\/\/swapi.dev\/api\/\w+\/(?<id>\d*)/', $url, $matches);
        return $matches['id'];
    }

    #[Route('/person/list', name: 'person_list', methods: ['GET'])]
    public function list(Request $request): JsonResponse
    {	 
        $url = 'https://swapi.dev/api/people/';
        $search = $request->query->get('search');
    	if(!empty($search))
    		$url .= "?search=".urlencode($search);

        $processedData = [];
    	$data = $this->getDataFromApi($url);

    	foreach ($data['results'] as $row)
        {
    		$apiId = $this->getIdFromApiUrl($row['url']);
            $processedData[] = [
                'api_id' => $apiId,
                'name' => $row['name']
            ];
    	}

        return new JsonResponse(['data' => $processedData], Response::HTTP_OK);
    }

    #[Route('/person/listSaved', name: 'person_list_saved', methods: ['GET'])]
    public function listSaved(): JsonResponse
    {   
        $processedData = [];
    	$personList = $this->getDoctrine()
            ->getRepository(Person::class)
            ->findAll();

        foreach ($personList as $person)
            $processedData[] = [
                'id' => $person->getId(),
                'api_id' => $person->getApiId(),
                'name' => $person->getName()
            ];

        return new JsonResponse(['data' => $processedData], Response::HTTP_OK);
    }

    private function getPersonFromApi(int $apiId): Person
    {
        $url = "https://swapi.dev/api/people/{$apiId}/";
        $data = $this->getDataFromApi($url);

        if(empty($data))
            return new JsonResponse(['message' => 'Person not found!'], Response::HTTP_BAD_REQUEST);

        $person = new Person();
        $person->setApiId($apiId);

        foreach ($data['films'] as $filmUrl) {

            $filmId = $this->getIdFromApiUrl($filmUrl);
            $film = $this->getDoctrine()
                ->getRepository(Film::class)
                ->findOneBy(['api_id' => $filmId]);

            if(empty($film)){

                $url = "https://swapi.dev/api/films/{$filmId}/";
                $filmData = $this->getDataFromApi($filmUrl);

                if(empty($filmData))
                    return new JsonResponse(['message' => 'Film not found!'], Response::HTTP_BAD_REQUEST);

                $film = new Film();
                $film->setApiId($filmId);

                $filmData['release_date'] = new DateTime($filmData['release_date']);
                unset($filmData['characters']);
                $film->populateWithArray($filmData);
            }

            $person->addFilm($film);
        }

        foreach ($data['species'] as $specieUrl) {

            $specieId = $this->getIdFromApiUrl($specieUrl);
            $specie = $this->getDoctrine()
                ->getRepository(Specie::class)
                ->findOneBy(['api_id' => $specieId]);

            if(empty($specie)){

                $url = "https://swapi.dev/api/species/{$specieId}/";
                $specieData = $this->getDataFromApi($specieUrl);

                if(empty($specieData))
                    return new JsonResponse(['message' => 'Specie not found!'], Response::HTTP_BAD_REQUEST);

                $specie = new Specie();
                $specie->setApiId($specieId);

                unset($specieData['people']);
                $specie->populateWithArray($specieData);
            }

            $person->setSpecie($specie);
        }

        unset($data['films']);
        unset($data['species']);
        $person->populateWithArray($data);

        return $person;
    }

   	#[Route('/person/{apiId}', name: 'person_get', methods: ['GET'])]
    public function getPerson(int $apiId): JsonResponse
    {	
        $person = $this->getDoctrine()
            ->getRepository(Person::class)
            ->findOneBy(['api_id' => $apiId]);

        if(empty($person))
            $person = $this->getPersonFromApi($apiId);

        return new JsonResponse(['data' => $person->toArrayWithRelations()], Response::HTTP_OK);
    }


    #[Route('/person/save/{apiId}', name: 'person_save', methods: ['POST'])]
    public function savePerson(int $apiId): JsonResponse
    {   
        $entityManager = $this->getDoctrine()->getManager();

    	$person = $this->getDoctrine()
            ->getRepository(Person::class)
            ->findOneBy(['api_id' => $apiId]);

        if(empty($person)){
            $person = $this->getPersonFromApi($apiId);

            $entityManager->persist($person);
            $entityManager->flush();
        }

        return new JsonResponse(['data' => $person->toArrayWithRelations(), 'message' => 'Person saved!'], Response::HTTP_OK);
    }

    #[Route('/person/delete/{apiId}', name: 'person_delete', methods: ['DELETE'])]
    public function deletePerson(int $apiId): JsonResponse
    {   
    	$person = $this->getDoctrine()
            ->getRepository(Person::class)
            ->findOneBy(['api_id' => $apiId]);

        if(empty($person))
            return new JsonResponse(['message' => 'Person not found!'], Response::HTTP_BAD_REQUEST);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($person);
        $entityManager->flush();
        
        return $this->listSaved();
    }
}


