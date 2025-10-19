<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "Aucune donnée reçue."]);
    exit;
}

$folder = "results/";
if (!is_dir($folder)) {
    mkdir($folder, 0777, true);
}

$file = $folder . "resultats.csv";

// Si le fichier n’existe pas encore, on ajoute l’en-tête
if (!file_exists($file)) {
    $header = ["Horodatage", "Âge", "Satisfaction", "Fonction préférée"];
    $csv = fopen($file, "w");
    fputcsv($csv, $header);
    fclose($csv);
}

// Ajout d’une nouvelle ligne avec les réponses
$csv = fopen($file, "a");
$ligne = [
    date("Y-m-d H:i:s"),
    $data["age"] ?? "",
    $data["satisfaction"] ?? "",
    $data["fonction"] ?? ""
];
fputcsv($csv, $ligne);
fclose($csv);

echo json_encode(["status" => "success", "message" => "Résultat ajouté."]);
?>
