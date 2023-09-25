"use client"
import { ExtendedPost } from '@/types/db'
import { FC, useRef } from 'react'
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Post from './Post'

interface PostFeedProps {
    initialPosts: ExtendedPost[]
    subredditName?: string
}

const PostFeed: FC<PostFeedProps> = ({ initialPosts, subredditName }) => {
    const lastPostRef = useRef<HTMLElement>(null)
    const { ref, entry } = useIntersection({
        root: lastPostRef.current,
        threshold: 1
    })

    const {data: session} = useSession()

    // implementing infinite scrolling
    const {data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
        ['infinite-query'],
        async ({ pageParam = 1 }) => {
            // define endpoints 
            const query = `/api/posts?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}` +
                (!!subredditName ? `&subredditName=${subredditName}` : '')

            const { data } = axios.get(query)
            return data as ExtendedPost[]
        }, {
            // get to next page
        getNextPageParam: (_, pages) => {
            return pages.length + 1
        },
        initialData: {pages: [initialPosts], pageParams: [1]}

    })
    const posts = data?.pages.flatMap((page) => page) ?? initialPosts

    return (
        <ul className='flex flex-col col-span-2 space-y-6'>
            {posts.map((post, index) => {
                const votesAmt = post.votes.reduce((acc, vote)=> {
                    if(vote.type === "UP") return acc + 1
                    if(vote.type === "DOWN") return acc -1
                    return acc
                }, 0)

                const currentVote = post.votes.find((vote) => vote.userId === session?.user.id)

                if(index === post.length - 1){
                    return (
                        <li key={post.id} ref={ref}>
                            <Post />
                        </li>
                    )
                } else {
                    return <Post />
                }
            })}
        </ul>

    )
}

export default PostFeed