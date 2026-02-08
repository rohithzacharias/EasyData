# API Reference Documentation

## Core Modules

### SchemaCompressor

Compresses dataset schemas into compact, LLM-friendly representations.

#### Class: `SchemaCompressor`

**Methods:**

##### `compress(df: pd.DataFrame) -> Dict[str, Any]`
Compresses a pandas DataFrame into a compact schema representation.

**Parameters:**
- `df` (pd.DataFrame): Input dataset to compress

**Returns:**
- Dictionary containing compressed schema with metadata

**Example:**
```python
from src.schema_compressor import SchemaCompressor
import pandas as pd

df = pd.read_csv('data.csv')
compressor = SchemaCompressor()
compressed = compressor.compress(df)
```

##### `to_text(compressed_schema: Dict) -> str`
Converts compressed schema to human-readable text format.

**Parameters:**
- `compressed_schema` (Dict): Output from `compress()` method

**Returns:**
- Formatted string representation

**Example:**
```python
text = compressor.to_text(compressed)
print(text)
```

##### `get_compression_stats(original_df: pd.DataFrame, compressed: Dict) -> Dict`
Calculates compression statistics.

**Returns:**
- Dictionary with `original_tokens`, `compressed_tokens`, `reduction_ratio`

---

### HistoryCompressor

Manages and compresses analysis history to maintain context efficiently.

#### Class: `HistoryCompressor`

**Initialization:**
```python
history = HistoryCompressor(max_active_steps=5)
```

**Parameters:**
- `max_active_steps` (int): Maximum number of recent steps to keep active (default: 5)

**Methods:**

##### `add_step(action: str, description: str, insights: List[str])`
Adds a new analysis step to history.

**Parameters:**
- `action` (str): Type of analysis performed
- `description` (str): Human-readable description
- `insights` (List[str]): Key findings from this step

**Example:**
```python
history.add_step(
    action="correlation_analysis",
    description="Analyzed feature correlations",
    insights=[
        "Age and Income show 0.65 correlation",
        "Education level highly correlated with Income"
    ]
)
```

##### `get_context_for_next_step() -> str`
Generates compressed context for the next AI query.

**Returns:**
- Formatted context string optimized for LLM consumption

##### `get_full_summary() -> str`
Gets complete analysis history summary.

**Returns:**
- Full formatted history including archived steps

---

### EDAAgent

AI-powered exploratory data analysis agent.

#### Class: `EDAAgent`

**Initialization:**
```python
agent = EDAAgent(
    df,
    name="My Analysis",
    api_key=None,
    model="gpt-4"
)
```

**Parameters:**
- `df` (pd.DataFrame): Dataset to analyze
- `name` (str): Analysis session name
- `api_key` (str, optional): OpenAI API key
- `model` (str): LLM model to use

**Methods:**

##### `analyze_missing_values()`
Analyzes missing values in the dataset.

**Returns:**
- Dictionary with missing value analysis results

##### `analyze_correlations()`
Computes and visualizes feature correlations.

**Returns:**
- Dictionary with correlation matrix and insights

##### `detect_outliers(method='iqr')`
Detects outliers using specified method.

**Parameters:**
- `method` (str): Detection method ('iqr', 'zscore', 'isolation_forest')

**Returns:**
- Dictionary with outlier detection results

##### `run_automated_eda(max_steps=10) -> Dict`
Runs complete automated EDA workflow.

**Parameters:**
- `max_steps` (int): Maximum analysis steps to perform

**Returns:**
- Dictionary with comprehensive analysis results

**Example:**
```python
from src.eda_agent import EDAAgent

agent = EDAAgent(df, name="Sales Analysis")
results = agent.run_automated_eda()
print(results['summary_report'])
```

---

### ScaleDownIntegration

Integrates with ScaleDown API for ultra-compression.

#### Class: `ScaleDownIntegration`

**Initialization:**
```python
scaledown = ScaleDownIntegration(api_key="your-key")
```

**Methods:**

##### `compress_schema(schema_text: str, model='gpt-4o', rate='auto') -> Dict`
Compresses schema using ScaleDown API.

**Parameters:**
- `schema_text` (str): Pre-compressed schema from SchemaCompressor
- `model` (str): Target LLM model
- `rate` (str): Compression rate ('auto', 'high', 'medium', 'low')

**Returns:**
- API response with ultra-compressed content

##### `compress_history(history_text: str, model='gpt-4o', rate='auto') -> Dict`
Compresses analysis history using ScaleDown API.

**Parameters:**
- `history_text` (str): History from HistoryCompressor
- `model` (str): Target LLM model
- `rate` (str): Compression rate

**Returns:**
- API response with compressed history

---

## Utility Functions

### From `utils.py`

##### `load_sample_data(dataset_name: str) -> pd.DataFrame`
Loads built-in sample datasets.

**Parameters:**
- `dataset_name` (str): 'titanic', 'iris', 'sales', 'housing'

**Returns:**
- pandas DataFrame

**Example:**
```python
from src.utils import load_sample_data

df = load_sample_data('titanic')
```

##### `estimate_tokens(text: str) -> int`
Estimates token count for text.

**Parameters:**
- `text` (str): Input text

**Returns:**
- Estimated token count

##### `calculate_cost(tokens: int, model='gpt-4') -> float`
Calculates estimated API cost.

**Parameters:**
- `tokens` (int): Number of tokens
- `model` (str): LLM model name

**Returns:**
- Cost in USD

---

## Visualization Functions

### From `visualizations.py`

##### `plot_missing_values(df: pd.DataFrame)`
Creates missing values visualization.

##### `plot_correlation_matrix(df: pd.DataFrame, method='pearson')`
Plots correlation heatmap.

**Parameters:**
- `method` (str): 'pearson', 'spearman', or 'kendall'

##### `plot_distribution(df: pd.DataFrame, column: str)`
Plots distribution for a specific column.

##### `plot_outliers(df: pd.DataFrame, column: str, method='iqr')`
Visualizes outliers in a column.

---

## Configuration

### Environment Variables

Create `.env` file:
```bash
OPENAI_API_KEY=your_openai_key
SCALEDOWN_API_KEY=your_scaledown_key
```

### config.json

```json
{
    "compression": {
        "max_active_steps": 5,
        "max_sample_values": 5
    },
    "agent": {
        "default_model": "gpt-4",
        "temperature": 0.7,
        "max_tokens": 2000
    },
    "scaledown": {
        "default_rate": "auto",
        "timeout": 30
    }
}
```

---

## Error Handling

All modules raise standard Python exceptions:

- `ValueError`: Invalid input parameters
- `APIError`: API-related errors (custom exception)
- `CompressionError`: Compression failures (custom exception)

**Example:**
```python
try:
    agent = EDAAgent(df)
    results = agent.run_automated_eda()
except ValueError as e:
    print(f"Invalid input: {e}")
except Exception as e:
    print(f"Error: {e}")
```

---

## Performance Tips

1. **Use compression for large datasets** (>1000 rows)
2. **Cache compressed schemas** for repeated analyses
3. **Adjust `max_active_steps`** based on memory constraints
4. **Use ScaleDown API** for maximum compression
5. **Batch similar analyses** to reuse context

---

## Version Compatibility

- Python: 3.8+
- pandas: 1.3.0+
- numpy: 1.21.0+
- matplotlib: 3.4.0+
- seaborn: 0.11.0+
- openai: 1.0.0+
- streamlit: 1.20.0+
