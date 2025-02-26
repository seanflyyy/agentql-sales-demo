import Header from '@/components/Header';
import Content from '@/components/Content';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header title="Website Change Monitor" />
      <Content />
    </main>
  );
}