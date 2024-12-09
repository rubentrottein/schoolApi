/* /api/upload/route.js
import { NextResponse } from 'next/server';

export const runtime = 'edge'; // Utilisation de l'Edge Runtime

export async function uploadMedia(request) {
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

        // Log des informations du fichier
        console.log('Fichier reçu:', {
            name: file.name,
            type: file.type,
            size: file.size
        });

        // Pour le test, on renvoie simplement les infos du fichier
        return NextResponse.json({
            success: true,
            file: {
                name: file.name,
                type: file.type,
                size: file.size
            }
        });

    } catch (error) {
        console.error('Erreur:', error);
        return NextResponse.json(
            { 
                error: 'Erreur serveur',
                message: error.message 
            },
            { status: 500 }
        );
    }
}

/**/