import pulp
import json
import sys


def optimizar_transporte(costos, oferta, demanda):
    num_oferta = len(oferta)
    num_demanda = len(demanda)

    # Crear el problema de LP
    prob = pulp.LpProblem("Problema_de_transporte", pulp.LpMinimize)

    # Crear las variables de decisión
    x = [
        [
            pulp.LpVariable(f"x_{i}_{j}", 0, None, pulp.LpContinuous)
            for j in range(num_demanda)
        ]
        for i in range(num_oferta)
    ]

    # Función objetivo
    prob += pulp.lpSum(
        [x[i][j] * costos[i][j] for i in range(num_oferta) for j in range(num_demanda)]
    )

    # Restricciones de oferta
    for i in range(num_oferta):
        prob += pulp.lpSum([x[i][j] for j in range(num_demanda)]) == oferta[i]

    # Restricciones de demanda
    for j in range(num_demanda):
        prob += pulp.lpSum([x[i][j] for i in range(num_oferta)]) == demanda[j]

    # Resolver el problema
    prob.solve(pulp.PULP_CBC_CMD(msg=0))

    # Recopilar los resultados
    result = {
        "status": pulp.LpStatus[prob.status],
        "costo_total": pulp.value(prob.objective),
        "decisiones": [
            [pulp.value(x[i][j]) for j in range(num_demanda)] for i in range(num_oferta)
        ],
    }

    return result


if __name__ == "__main__":
    # Ejemplo de entrada
    data = json.load(sys.stdin)

    costos = data["costos"]
    oferta = data["oferta"]
    demanda = data["demanda"]

    resultado = optimizar_transporte(costos, oferta, demanda)
    print(json.dumps(resultado))
