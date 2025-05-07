import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Image, Text, Button, Loader, Title, Paper, Badge, Group } from "@mantine/core";
import { useApi } from "../components/useApi";

interface BreedDetail {
    id: string;
    attributes: {
        name: string;
        description: string;
        life: { min: number; max: number };
        male_weight: { min: number; max: number };
        female_weight: { min: number; max: number };
        hypoallergenic: boolean;
    };
}

interface BreedApiResponse {
    data: BreedDetail;
}

interface DogImageApiResponse {
    message: string;
    status: string;
}

export default function DogBreedDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Fetch breed detail by id
    const {
        data: breedData,
        loading: breedLoading,
        error: breedError,
    } = useApi<BreedApiResponse>(`https://dogapi.dog/api/v2/breeds/${id}`);

    // Fetch enrichment image
    const {
        data: imgData,
        loading: imgLoading,
        error: imgError,
    } = useApi<DogImageApiResponse>("https://dog.ceo/api/breeds/image/random");

    if (breedLoading || imgLoading) return <div className="center-loader">
        <Loader size="lg" />
    </div>;
    
    if (breedError) return <div style={{ color: "red" }}>Error: {breedError}</div>;
    if (!breedData) return <div>No breed found.</div>;

    const { name, description, life, male_weight, female_weight, hypoallergenic } =
        breedData.data.attributes;

    return (
        <Paper maw={600} mx="auto" mt={40} p="lg" withBorder>
            <Title mb="md">{name}</Title>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                {imgData?.message && (
                    <Image src={imgData.message} height={200} alt={`Image of ${name}`} mb="md" />
                )}
                <Text size="md" mb="sm">
                    {description}
                </Text>
                <Group mb="sm">
                    <Badge color="blue" variant="light">
                        Lifespan: {life.min} - {life.max} yrs
                    </Badge>
                    <Badge color="green" variant="light">
                        Male Weight: {male_weight.min} - {male_weight.max} kg
                    </Badge>
                    <Badge color="teal" variant="light">
                        Female Weight: {female_weight.min} - {female_weight.max} kg
                    </Badge>
                    <Badge color={hypoallergenic ? "yellow" : "gray"} variant="light">
                        {hypoallergenic ? "Hypoallergenic" : "Not Hypoallergenic"}
                    </Badge>
                </Group>
                <Button variant="light" onClick={() => navigate("/breeds")}>
                    Back to List
                </Button>
            </Card>
        </Paper>
    );
}
