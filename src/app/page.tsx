import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
    title: 'The AutoBharat | Home',
    description: 'Welcome to The AutoBharat, your source for the latest automotive news, reviews, and insights.',
};

export default function Page() {
    return <HomeClient />;
}
