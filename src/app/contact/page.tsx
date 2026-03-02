import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
    title: 'The AutoBharat',
    description: 'Get in touch with The AutoBharat for editorial inquiries, partnerships, and collaborations.',
};

export default function Page() {
    return <ContactClient />;
}
