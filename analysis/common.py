"""YDP.Lab 군집분석 공통 설정.

노트북들이 같은 데이터, 같은 코드표, 같은 파이프라인을 쓰도록 한곳에 모아 둔다.
파이프라인 설정은 실제 서비스(backend/app/model/kmeansmodel.py)와 동일하다.
"""
from pathlib import Path

import matplotlib.pyplot as plt
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

ROOT = Path(__file__).resolve().parents[1]
DATA_FILE = ROOT / "backend" / "data" / "mz_processed.csv"
FIG_DIR = ROOT / "analysis" / "figures"
FIG_DIR.mkdir(parents=True, exist_ok=True)

FEATURES = [
    "household_income",
    "leisure_purpose",
    "leisure_purpose_2",
    "weekday_avg_leisure_time",
    "weekend_avg_leisure_time",
    "rest_recreation_rate",
    "hobby_rate",
    "self_improvement_rate",
    "social_relationship_rate",
    "leisure_activity_1",
    "leisure_activity_2",
    "leisure_activity_3",
    "leisure_activity_4",
    "leisure_activity_5",
]

FEATURE_KO = {
    "household_income": "가구소득",
    "leisure_purpose": "여가목적 1순위",
    "leisure_purpose_2": "여가목적 2순위",
    "weekday_avg_leisure_time": "평일 여가시간",
    "weekend_avg_leisure_time": "주말 여가시간",
    "rest_recreation_rate": "휴식·오락 비율",
    "hobby_rate": "취미 비율",
    "self_improvement_rate": "자기계발 비율",
    "social_relationship_rate": "대인관계 비율",
    "leisure_activity_1": "관심활동 1순위",
    "leisure_activity_2": "관심활동 2순위",
    "leisure_activity_3": "관심활동 3순위",
    "leisure_activity_4": "관심활동 4순위",
    "leisure_activity_5": "관심활동 5순위",
}

INCOME = {0: "무응답", 1: "300만 미만", 2: "300~500만", 3: "500~700만", 4: "700만 이상"}
PURPOSE = {
    0: "없음",
    1: "마음의 안정·휴식",
    2: "남는 시간 보내기",
    3: "가족·지인과 시간",
    4: "자기만족·즐거움",
    5: "자기계발",
    6: "스트레스 해소",
    7: "건강 관리",
    8: "대인관계·교제",
    9: "기타",
}
ACTIVITY = {
    0: "없음",
    1: "미디어/콘텐츠",
    2: "스포츠/운동",
    3: "여행/야외활동",
    4: "문화/예술",
    5: "자기계발",
    6: "사교/가족",
    7: "일상/휴식",
    8: "기타",
}

ANIMALS = {
    0: "범고래",
    1: "왜가리",
    2: "매너티",
    3: "알바트로스",
    4: "푸른바다거북",
    5: "돌고래",
    6: "펭귄",
    7: "해파리",
}

RATIO_COLS = [
    "weekday_avg_leisure_time",
    "weekend_avg_leisure_time",
    "rest_recreation_rate",
    "hobby_rate",
    "self_improvement_rate",
    "social_relationship_rate",
]

RANDOM_STATE = 42


def setup_plot():
    from matplotlib import font_manager
    installed = {f.name for f in font_manager.fontManager.ttflist}
    candidates = ["Malgun Gothic", "AppleGothic", "NanumGothic", "Noto Sans CJK KR", "Noto Sans CJK JP"]
    korean = next((f for f in candidates if f in installed), None)
    if korean:
        plt.rcParams["font.family"] = korean
    plt.rcParams["axes.unicode_minus"] = False
    plt.rcParams["figure.dpi"] = 110
    plt.rcParams["axes.spines.top"] = False
    plt.rcParams["axes.spines.right"] = False


def load_data() -> pd.DataFrame:
    return pd.read_csv(DATA_FILE)


def make_pipeline(k: int = 8, n_components: int = 2) -> Pipeline:
    """서비스와 같은 전처리 → PCA → K-Means 파이프라인."""
    return Pipeline([
        ("imputer", SimpleImputer(strategy="mean")),
        ("scaler", StandardScaler()),
        ("pca", PCA(n_components=n_components, random_state=RANDOM_STATE)),
        ("kmeans", KMeans(n_clusters=k, n_init="auto", random_state=RANDOM_STATE)),
    ])


def save(fig, name: str):
    path = FIG_DIR / name
    fig.savefig(path, bbox_inches="tight", dpi=150)
    return path
