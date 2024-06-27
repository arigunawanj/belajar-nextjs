import dynamic from "next/dynamic";
import {
    Box,
    Flex,
    Grid,
    GridItem,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Heading,
    Text,
    Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useQueries } from "@/hooks/useQueries";
import Swal from "sweetalert2";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Notes() {
    const router = useRouter();
    const {
        data: listNotes,
        isLoading,
        isError,
    } = useQueries({ prefixUrl: "https://service.pace-unv.cloud/api/notes" });

    if (isLoading) return <Text>Loading...</Text>;
    if (isError) return <Text>Error loading notes</Text>;

    const HandleDelete = async (id) => {
        const deleteNote = async () => {
            try {
                const response = await fetch(
                    `https://service.pace-unv.cloud/api/notes/delete/${id}`,
                    {
                        method: "DELETE",
                    }
                );
                const result = await response.json();
                if (result?.success) {
                    router.reload();
                    Swal.fire({
                        title: "Terhapus",
                        text: "Notemu berhasil di hapus!",
                        icon: "success",
                    });
                } else {
                    Swal.fire({
                        title: "Terjadi Kesalahan!",
                        text: "Adalah masalah ketika menghapus Note ini",
                        icon: "error",
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: "Terjadi Kesalahan!",
                    text: "Adalah masalah ketika menghapus Note ini",
                    icon: "error",
                });
            }
        };

        Swal.fire({
            title: "Apa Kamu yakin ?",
            text: "Kamu tidak bisa mengembalikan ini lagi!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteNote();
            }
        });
    };

    return (
        <>
            <LayoutComponent metaTitle="Notes">
                <Box padding="5">
                    <Flex justifyContent="end">
                        <Button
                            colorScheme="blue"
                            onClick={() => router.push("/notes/add")}
                        >
                            Add Notes
                        </Button>
                    </Flex>
                    <Flex>
                        <Grid templateColumns="repeat(3, 1fr)" gap={5}>
                            {listNotes.data.map((item) => (
                                <GridItem key={item.id}>
                                    <Card>
                                        <CardHeader>
                                            <Heading>{item?.title}</Heading>
                                        </CardHeader>
                                        <CardBody>
                                            <Text>{item?.description}</Text>
                                        </CardBody>
                                        <CardFooter justify="space-between" flexWrap="wrap">
                                            <Button
                                                onClick={() => router.push(`/notes/edit/${item?.id}`)}
                                                flex="1"
                                                variant="ghost"
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                onClick={() => HandleDelete(item?.id)}
                                                flex="1"
                                                colorScheme="red"
                                            >
                                                Delete
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </GridItem>
                            ))}
                        </Grid>
                    </Flex>
                </Box>
            </LayoutComponent>
        </>
    );
}
