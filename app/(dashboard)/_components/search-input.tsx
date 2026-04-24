'use client'

import qs from 'query-string';
import { Search } from 'lucide-react';
import { useDebounceCallback } from 'usehooks-ts';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ChangeEvent,
  useEffect,
  useState
} from 'react';
import { Input } from '@/components/ui/input';


export const SearchFilterInput = () => {
  const router = useRouter();
  const [value, setValue] = useState('');
  const debounce = useDebounceCallback(setValue, 500)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(e.currentTarget.value);
  }

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: '/',
      query: {
        search: value,
      },
    }, { skipEmptyString: true, skipNull: true });

    router.push(url)
  }, [value, router])


  return (
    <div className='w-[516px] relative'>
      <Search className='absolute top-1/2 left-3 transform -translate-1/2 text-muted-foreground h-4 w-4' />
      <Input className='max-w-[516px] pl-9'
        placeholder='Search boards'
        onChange={handleChange} />
    </div>
  );
}
