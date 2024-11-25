import { NextResponse } from 'next/server';
import ftp from 'basic-ftp';
import { Readable } from 'stream';

export async function POST(request) {
    try {
        console.log('Début de la requête');

        const formData = await request.formData();
        const file = formData.get('image');

        if (!file) {
            return NextResponse.json(
                { error: 'Aucun fichier fourni' },
                { status: 400 }
            );
        }

        console.log('Fichier reçu:', file.name);

        // Configuration spécifique OVH
        const client = new ftp.Client(30000); // timeout plus long pour OVH
        try {
            console.log('Tentative de connexion FTP à OVH...');
            await client.access({
                host: 'ftp.cluster026.hosting.ovh.net', // hôte fixe
                user: process.env.FTP_USER,
                password: process.env.FTP_PASSWORD,
                secure: false,
                port: 21 // port explicite
            });
            
            console.log('Connexion FTP réussie');
            
            // Liste des dossiers pour debug
            console.log('Liste des dossiers:');
            await client.list();

            client.close();
            console.log('Connexion FTP fermée');

            return NextResponse.json({
                success: true,
                message: 'Test de connexion réussi'
            });

        } catch (ftpError) {
            console.error('Erreur FTP détaillée:', ftpError);
            return NextResponse.json(
                { 
                    error: 'Erreur de connexion FTP',
                    details: ftpError.message,
                    code: ftpError.code 
                },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('Erreur principale:', error);
        return NextResponse.json(
            { 
                error: 'Erreur serveur',
                details: error.message 
            },
            { status: 500 }
        );
    }
}