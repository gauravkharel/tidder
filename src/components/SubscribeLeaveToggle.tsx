"use client"

import { FC, startTransition } from 'react'
import { Button } from './ui/Button'
import { useMutation } from '@tanstack/react-query'
import { SubscribeToSubredditPayload } from '@/lib/validators/subreddit'
import axios, { AxiosError } from 'axios'
import { useCustomToast } from '@/hooks/use-custom-toast'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

interface SubscribeLeaveToggleProps {
    subredditId: string
    subredditName: string
    isSubscribed: boolean
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({
    subredditId,
    subredditName,
    isSubscribed
}) => {
    const { loginToast } = useCustomToast()
    const { toast } = useToast()

    const router = useRouter()

    const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
        mutationFn: async () => {
            const payload: SubscribeToSubredditPayload = {
                subredditId
            }

            const { data } = await axios.post('/api/subreddit/subscribe', payload)
            return data as string
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 401) {
                    return loginToast()
                }
            }

            return toast({
                title: 'There was a problem',
                description: 'Something went wrong. Please try again.',
                variant: "destructive"
            })
        },
        onSuccess: () => {
            startTransition(() => {
                router.refresh()
            })

            return toast({
                title: 'Subscribed',
                variant: 'default',
                description: "Wow, welcome to the team."
            })

        }
    })

    const { mutate: unsubscribe, isLoading: isUnsubLoading } = useMutation({
        mutationFn: async () => {
            const payload: SubscribeToSubredditPayload = {
                subredditId
            }

            const { data } = await axios.post('/api/subreddit/unsubscribe', payload)
            return data as string
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 401) {
                    return loginToast()
                }
            }
            return toast({
                title: 'There was a problem',
                description: 'Something went wrong. Please try again.',
                variant: "destructive"
            })
        },
        onSuccess: () => {
            startTransition(() => {
                router.refresh()
            })

            return toast({
                title: 'Unsubscribed.',
                description: "Bye, we will miss you.",
                variant: 'destructive',
            })
        }
    })
    return (
        isSubscribed ? (
            <Button
                isLoading={isUnsubLoading}
                onClick={() => unsubscribe()}
                className='w-full mt-1 mb-4'
            >
                Leave Community
            </Button>
        ) : (
            <Button
                className='w-full mt-1 mb-4'
                isLoading={isSubLoading}
                onClick={() => subscribe()}
            >
                Join  to post
            </Button>)
    )
}

export default SubscribeLeaveToggle