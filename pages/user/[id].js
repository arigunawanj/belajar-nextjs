import Layout from "@/layout";
import { useRouter } from "next/router";

export async function getStaticProps({ params }) {
    const res = await fetch('https://api.github.com/repos/vercel/next.js')
    const repo = await res.json()
    return { props: { repo } }
}

export async function getStaticPaths() {
    const paths = [
        { params: { id: '70107786' } },
    ];
    
    return { paths, fallback: false };
}

export default function UsersByName({ repo }) {
    const router = useRouter();
    const { id } = router.query;

    return (
        <Layout>
            <p>Users by ID {id}</p>
            <p>Repo Name: {repo.name}</p>
        </Layout>
    );
}
