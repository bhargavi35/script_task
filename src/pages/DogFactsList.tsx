import React, { useMemo, useState } from "react";
import {
    Table,
    TextInput,
    Button,
    Loader,
    Title,
    Paper,
    NumberInput,
    Group,
    Tooltip,
    ActionIcon,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../components/useApi";

interface Breed {
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

export default function DogBreedsList() {
    const { data, loading, error } = useApi<{ data: Breed[] }>(
        "https://dogapi.dog/api/v2/breeds"
    );
    const breeds = data?.data ?? [];
    const [search, setSearch] = useState("");
    const [minWeight, setMinWeight] = useState<number | "">("");
    const [maxWeight, setMaxWeight] = useState<number | "">("");
    const [minLife, setMinLife] = useState<number | "">("");
    const [maxLife, setMaxLife] = useState<number | "">("");
    const navigate = useNavigate();

    // Clear all filters
    const clearFilters = () => {
        setSearch("");
        setMinWeight("");
        setMaxWeight("");
        setMinLife("");
        setMaxLife("");
    };

    // Filtering logic
    const filteredBreeds = useMemo(() => {
        return breeds.filter((breed) => {
            const { name, description, life, male_weight, female_weight } =
                breed.attributes;
            const matchSearch =
                name.toLowerCase().includes(search.toLowerCase()) ||
                description.toLowerCase().includes(search.toLowerCase());

            const avgWeight =
                (male_weight.min +
                    male_weight.max +
                    female_weight.min +
                    female_weight.max) /
                4;

            const avgLife = (life.min + life.max) / 2;

            const matchWeight =
                (minWeight === "" || avgWeight >= minWeight) &&
                (maxWeight === "" || avgWeight <= maxWeight);

            const matchLife =
                (minLife === "" || avgLife >= minLife) &&
                (maxLife === "" || avgLife <= maxLife);

            return matchSearch && matchWeight && matchLife;
        });
    }, [breeds, search, minWeight, maxWeight, minLife, maxLife]);

    return (
        <Paper maw={900} mx="auto" mt={40} p="lg" withBorder>
            <Title mb="md">Dog Breeds</Title>
            <Group mb="md" spacing="md" align="end">
                <TextInput
                    label="Search"
                    placeholder="Name or description"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <NumberInput
                    label="Min Avg Weight (kg)"
                    placeholder="Min"
                    value={minWeight}
                    onChange={(value) => setMinWeight(value === null ? "" : value)}
                    min={0}
                />
                <NumberInput
                    label="Max Avg Weight (kg)"
                    placeholder="Max"
                    value={maxWeight}
                    onChange={(value) => setMaxWeight(value === null ? "" : value)}
                    min={0}
                />
                <NumberInput
                    label="Min Avg Lifespan (yrs)"
                    placeholder="Min"
                    value={minLife}
                    onChange={(value) => setMinLife(value === null ? "" : value)}
                    min={0}
                />
                <NumberInput
                    label="Max Avg Lifespan (yrs)"
                    placeholder="Max"
                    value={maxLife}
                    onChange={(value) => setMaxLife(value === null ? "" : value)}
                    min={0}
                />
                <Tooltip label="Clear all filters">
                    <ActionIcon
                        color="red"
                        variant="light"
                        size="lg"
                        onClick={clearFilters}
                        aria-label="Clear filters"
                        style={{ marginTop: 22 }}
                    >
                        Clear <IconX />
                    </ActionIcon>
                </Tooltip>
            </Group>
            {loading ? (
                <Loader />
            ) : error ? (
                <div style={{ color: "red" }}>Error: {error}</div>
            ) : (
                <Table striped highlightOnHover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Avg Weight (kg)</th>
                            <th>Avg Lifespan (yrs)</th>
                            <th>Hypoallergenic</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBreeds.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ textAlign: "center" }}>
                                    No breeds found.
                                </td>
                            </tr>
                        ) : (
                            filteredBreeds.map((breed) => {
                                const {
                                    name,
                                    life,
                                    male_weight,
                                    female_weight,
                                    hypoallergenic,
                                } = breed.attributes;
                                const avgWeight = (
                                    (male_weight.min +
                                        male_weight.max +
                                        female_weight.min +
                                        female_weight.max) /
                                    4
                                ).toFixed(1);
                                const avgLife = ((life.min + life.max) / 2).toFixed(1);

                                return (
                                    <tr key={breed.id}>
                                        <td>{name}</td>
                                        <td>{avgWeight}</td>
                                        <td>{avgLife}</td>
                                        <td>{hypoallergenic ? "Yes" : "No"}</td>
                                        <td>
                                            <Button
                                                size="xs"
                                                onClick={() => navigate(`/breeds/${breed.id}`)}
                                            >
                                                View
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </Table>
            )}
        </Paper>
    );
}
