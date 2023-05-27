import prisma from '../../lib/prisma';
import { PostProps } from '@/components/Post';
import Layout from '@/components/Layout';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { GetServerSideProps } from "next"




const Post: React.FC<PostProps> = (props) => {
    
    let title = props.title
    if (!props.published) {
        title = `${title} (Draft)`
    }

    return (
        <Layout>
            <div>
                <h2>{title}</h2>
                <p>By {props?.author?.name || "Unknown author"}</p>
                <ReactMarkdown children={props.content} />
            </div>
            <style jsx>{`
          .page {
            background: white;
            padding: 2rem;
          }
          .actions {
            margin-top: 2rem;
          }
          button {
            background: #ececec;
            border: 0;
            border-radius: 0.125rem;
            padding: 1rem 2rem;
          }
          button + button {
            margin-left: 1rem;
          }
        `}</style>
        </Layout>
    )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const {params} =ctx;
    const post = await prisma.post.findUnique({
        where: {
            id: String(params?.id),
        },
        include: {
            author: {
                select: { name: true },
            },
        },
    });
    return {
        props: post,
    };
};
export default Post;