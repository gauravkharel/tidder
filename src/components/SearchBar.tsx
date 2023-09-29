'use client'

import { FC, useCallback, useState } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/Command'
import { useQuery } from '@tanstack/react-query'
import { Prisma, Subreddit } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Users } from 'lucide-react'
import { request } from 'http'
import debounce from 'lodash.debounce'

interface SearchBarProps {

}

const SearchBar: FC<SearchBarProps> = ({ }) => {
    const [input, setInput] = useState<string>('')

    const {
        data: queryResults,
        refetch,
        isFetched,
        isFetching,
    } = useQuery({
        queryFn: async () => {
            if (!input) return []
            const { data } = await axios.get(`/api/search?q=${input}`)
            return data as (Subreddit & {
                _count: Prisma.SubredditCountOutputType
            })[]
        },
        queryKey: ['search-query'],
        enabled: false,
    })

    const request =  debounce(async() => {
        refetch()
    }, 300)

    const debounceRequest = useCallback(() => {
        request()
    }, [])
    
    const router = useRouter()
    return(
        <Command className='relative rounded-lg border max-w-lg z-50 overflow-visible'>
            <CommandInput
                value={input}
                onValueChange={(text) => {
                    setInput(text)
                    debounceRequest()
                }}
                className='outline-none border-none focus:border-none focus:outline-none ring-0'
                placeholder='Search here...'
            />

            {input.length > 0 ? (
                <CommandList className='absolute bg-white inset-x-0 shadow rounded-b-md'>
                    {isFetched && <CommandEmpty className=' top-4'>No results found.</CommandEmpty>}
                    {(queryResults?.length ?? 0) > 0 ? (
                        <CommandGroup heading='Communities'>
                            {queryResults?.map((subreddit) => (
                                <CommandItem onSelect={(e) => {
                                    router.push(`/r/${e}`)
                                    router.refresh()
                                    }}
                                    key={subreddit.id}
                                    value={subreddit.name}
                                    >
                                    <Users className='mr-2 h-4 w-4'  />
                                    <a href={`/r/${subreddit.name}`}>/r/{subreddit.name}</a>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    ): null}
                </CommandList>
            ): null}
        </Command>
    )
}

export default SearchBar