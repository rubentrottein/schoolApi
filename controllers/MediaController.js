import { NextResponse } from 'next/server';
import ftp from 'basic-ftp';
import { Readable } from 'stream';

export async function uploadMedia(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('image');

        if (!file) {
            return NextResponse.json(
                { error: 'Aucun fichier fourni' },
                { status: 400 }
            );
        }

        // Convertir le fichier en buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Créer un nom de fichier unique
        const fileName = `${Date.now()}-${file.name}`;

        // Configurer le client FTP
        const client = new ftp.Client();
        
        try {
            await client.access({
                host: process.env.FTP_HOST,
                user: process.env.FTP_USER,
                password: process.env.FTP_PASSWORD,
                secure: false
            });

            // Convertir le buffer en stream
            const fileStream = Readable.from(buffer);
            
            // Upload du fichier
            await client.uploadFrom(fileStream, `/uploads/${fileName}`);

        } catch (ftpError) {
            console.error('Erreur FTP:', ftpError);
            throw new Error('Erreur lors de l\'upload FTP');
        } finally {
            client.close();
        }

        // Construire l'URL publique du fichier
        const fileUrl = `http://${process.env.SITE_URL}/uploads/${fileName}`;

        return NextResponse.json({
            success: true,
            imageUrl: fileUrl
        });

    } catch (error) {
        console.error('Erreur:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};