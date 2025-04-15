// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import SearchComponent from '@/components/search/searchComponent';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Search',
        href: '/get',
    },
];

export default function Search() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Search" />
            <SearchComponent />
        </AppLayout>
    );
}
