import numpy as np
import json
import sys

def optimizar_transporte_max(cost_matrix, supply, demand):
    # Paso 1: Transformar la matriz de costos para convertir el problema en uno de maximización
    max_cost_value = np.max(cost_matrix)
    transformed_costs = (max_cost_value + 1) - cost_matrix
    
    # Paso 2: Aplicar el método de la esquina noroeste para obtener una solución básica
    supply_copy = supply.copy()
    demand_copy = demand.copy()
    number_of_sources = len(supply)
    number_of_destinations = len(demand)
    i, j = 0, 0
    basic_solution = np.zeros_like(cost_matrix)
    
    while i < number_of_sources and j < number_of_destinations:
        min_value = min(supply_copy[i], demand_copy[j])
        basic_solution[i][j] = min_value
        supply_copy[i] -= min_value
        demand_copy[j] -= min_value
        
        if supply_copy[i] == 0 and i < number_of_sources - 1:
            i += 1
        if demand_copy[j] == 0 and j < number_of_destinations - 1:
            j += 1

    # Paso 3: Calcular el costo total de la solución básica
    total_max_cost = np.sum(basic_solution * cost_matrix)

    return total_max_cost, basic_solution

if __name__ == "__main__":
    # Ejemplo de entrada
    data = json.load(sys.stdin)

    costos = data["costos"]
    oferta = data["oferta"]
    demanda = data["demanda"]

    resultado = optimizar_transporte_max(costos, oferta, demanda)
    print(json.dumps(resultado))
