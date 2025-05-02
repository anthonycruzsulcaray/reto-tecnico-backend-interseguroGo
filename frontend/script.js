
async function processMatrix() {
    const matrixInput = document.getElementById('matrixInput').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = "Procesando...";

    try {
        // Primera solicitud: API de rotación
        const rotationResponse = await fetch('http://reto-interseguro-go-env-2.eba-ba2fmp3g.us-west-1.elasticbeanstalk.com/qr', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ matriz: JSON.parse(matrixInput) })
        });

        if (!rotationResponse.ok) {
            throw new Error('Error al comunicarse con la API de rotación');async function processMatrix() {
                const matrixInput = document.getElementById('matrixInput').value;
                const resultsDiv = document.getElementById('results');
                resultsDiv.innerHTML = "Procesando...";

                try {
                    console.log('Matrix Input:', matrixInput);

                    // Primera solicitud: API de rotación
                    console.log('Enviando solicitud a la API de rotación...');
                    const rotationResponse = await fetch('http://reto-interseguro-go-env-2.eba-ba2fmp3g.us-west-1.elasticbeanstalk.com/qr', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ matriz: JSON.parse(matrixInput) })
                    });

                    console.log('Respuesta de la API de rotación:', rotationResponse);

                    if (!rotationResponse.ok) {
                        throw new Error('Error al comunicarse con la API de rotación');
                    }

                    const rotationData = await rotationResponse.json();
                    console.log('Datos de rotación:', rotationData);

                    // Segunda solicitud: API de análisis
                    console.log('Enviando solicitud a la API de análisis...');
                    const analysisResponse = await fetch('http://reto-interseguro-node-env-2.eba-933y4irh.us-west-1.elasticbeanstalk.com/analyze', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            rotated: rotationData.rotated,
                            Q: rotationData.Q,
                            R: rotationData.R
                        })
                    });

                    console.log('Respuesta de la API de análisis:', analysisResponse);

                    if (!analysisResponse.ok) {
                        throw new Error('Error al comunicarse con la API de análisis');
                    }

                    const analysisData = await analysisResponse.json();
                    console.log('Datos de análisis:', analysisData);

                    // Mostrar resultados en la página
                    resultsDiv.innerHTML = `
                        <h3>Resultados:</h3>
                        <p><strong>Matriz Rotada:</strong> ${JSON.stringify(analysisData.Rotatedmatriz)}</p>
                        <p><strong>Estadísticas de Q:</strong> ${JSON.stringify(analysisData.QStats)}</p>
                        <p><strong>Estadísticas de R:</strong> ${JSON.stringify(analysisData.RStats)}</p>
                        <p><strong>Matriz Q:</strong> ${JSON.stringify(analysisData.Qmatriz)}</p>
                        <p><strong>Matriz R:</strong> ${JSON.stringify(analysisData.Rmatriz)}</p>
                    `;
                } catch (error) {
                    console.error('Error:', error);
                    resultsDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
                }
            }
        }

        const rotationData = await rotationResponse.json();

        // Segunda solicitud: API de análisis
        const analysisResponse = await fetch('http://reto-interseguro-node-env-2.eba-933y4irh.us-west-1.elasticbeanstalk.com/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                rotated: rotationData.rotated,
                Q: rotationData.Q,
                R: rotationData.R
            })
        });

        if (!analysisResponse.ok) {
            throw new Error('Error al comunicarse con la API de análisis');
        }

        const analysisData = await analysisResponse.json();

        // Mostrar resultados en la página
        resultsDiv.innerHTML = `
            <h3>Resultados:</h3>
            <p><strong>Matriz Rotada:</strong> ${JSON.stringify(analysisData.Rotatedmatriz)}</p>
            <p><strong>Estadísticas de Q:</strong> ${JSON.stringify(analysisData.QStats)}</p>
            <p><strong>Estadísticas de R:</strong> ${JSON.stringify(analysisData.RStats)}</p>
            <p><strong>Matriz Q:</strong> ${JSON.stringify(analysisData.Qmatriz)}</p>
            <p><strong>Matriz R:</strong> ${JSON.stringify(analysisData.Rmatriz)}</p>
        `;
    } catch (error) {
        resultsDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}