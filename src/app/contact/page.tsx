import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Get in touch with The AutoBharat for editorial inquiries, partnerships, and collaborations.',
};

export default function Page() {
    return <ContactClient />;
}
