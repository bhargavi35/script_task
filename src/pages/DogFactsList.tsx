import React, { useEffect, useMemo, useState } from "react";
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
    Pagination,
    useMantineTheme
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
    const [sortBy, setSortBy] = useState<"name" | "weight" | "life" | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const theme = useMantineTheme();
    const isDark = theme.colorScheme === "dark";

    // Clear all filters
    const clearFilters = () => {
        setSearch("");
        setMinWeight("");
        setMaxWeight("");
        setMinLife("");
        setMaxLife("");
        setSortBy(null);
        setSortDirection("asc");
    };

    // Sorting logic
    const sortedBreeds = useMemo(() => {
        const breedList = [...breeds];
        if (sortBy) {
            breedList.sort((a, b) => {
                const aValue = sortBy === "name" ? a.attributes.name :
                    sortBy === "weight" ? (a.attributes.male_weight.min + a.attributes.female_weight.min) / 2 :
                        (a.attributes.life.min + a.attributes.life.max) / 2;
                const bValue = sortBy === "name" ? b.attributes.name :
                    sortBy === "weight" ? (b.attributes.male_weight.min + b.attributes.female_weight.min) / 2 :
                        (b.attributes.life.min + b.attributes.life.max) / 2;
                if (sortDirection === "asc") {
                    return aValue > bValue ? 1 : -1;
                } else {
                    return aValue < bValue ? 1 : -1;
                }
            });
        }
        return breedList;
    }, [breeds, sortBy, sortDirection]);

    // Filtering logic
    const filteredBreeds = useMemo(() => {
        return sortedBreeds.filter((breed) => {
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
    }, [sortedBreeds, search, minWeight, maxWeight, minLife, maxLife]);

    const paginatedBreeds = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredBreeds.slice(start, end);
    }, [filteredBreeds, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, minWeight, maxWeight, minLife, maxLife]);

    return (
        <Paper shadow="md" radius="md" p="xl" withBorder
            style={{
                backgroundColor: isDark ? theme.colors.dark[6] : theme.white,
            }}>
            <Title mb="lg" order={2} align="center" color={isDark ? "gray.3" : "gray.8"}>
                🐾 Dog Breeds
            </Title>
            <Group mb="lg" position="apart" align="end">
                <Group spacing="md">
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
            </Group>
            {loading ? (
                <div className="center-loader">
                    <Loader size="lg" />
                </div>
            ) : error ? (
                <div style={{ color: theme.colors.red[6] }}>Error: {error}</div>
            ) : (
                <Table striped highlightOnHover withBorder withColumnBorders>
                    <thead
                        style={{
                            backgroundColor: isDark ? theme.colors.dark[5] : theme.colors.gray[1],
                        }}
                    >
                        <tr>
                            <th>
                                <Button variant="link" onClick={() => setSortBy("name")}>Name</Button>
                            </th>
                            <th>
                                <Button variant="link" onClick={() => setSortBy("weight")}>Avg Weight (kg)</Button>
                            </th>
                            <th>
                                <Button variant="link" onClick={() => setSortBy("life")}>Avg Lifespan (yrs)</Button>
                            </th>
                            <th>Hypoallergenic</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedBreeds.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ textAlign: "center" }}>
                                    No breeds found.
                                </td>
                            </tr>
                        ) : (
                            paginatedBreeds.map((breed) => {
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
            {filteredBreeds.length > itemsPerPage && (
                <Group position="center" mt="md">
                    <Pagination
                        total={Math.ceil(filteredBreeds.length / itemsPerPage)}
                        value={currentPage}
                        onChange={setCurrentPage}
                    />
                </Group>
            )}
        </Paper>
    );
}
